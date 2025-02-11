import inspect
import random
import re
from ast import Call
from collections import OrderedDict
from typing import Callable, Dict, List, Set, Tuple, Union, cast, get_args, get_origin

from devtools import debug
from pepperbot.core.message.segment import Text
from pepperbot.exceptions import EventHandlerDefineError, InitializationError
from pepperbot.extensions.command.handle import LIFECYCLE_WITHOUT_PATTERNS
from pepperbot.extensions.command.pattern import merge_text_of_patterns
from pepperbot.store.command import (
    COMMAND_CONFIG,
    ClassCommandCache,
    CommandConfig,
    CommandMethodCache,
    PatternArg,
    T_PatternArg,
    class_command_config_mapping,
    class_command_mapping,
    runtime_pattern_arg_types,
)

# from pepperbot.parse import (
#     GROUP_EVENTS,
#     GROUP_EVENTS_T,
#     GroupEvent,
#     is_valid_friend_method,
#     is_valid_group_method,
# )
# from pepperbot.parse.bots import *
# from pepperbot.parse.kwargs import (
#     DEFAULT_KWARGS,
#     HANDLER_KWARGS_MAP,
#    EventHandlerKwarg,
#     construct_GroupCommonBot,
# )
from pepperbot.store.meta import (
    ClassHandlerCache,
    class_handler_mapping,
    route_validator_mapping,
)
from pepperbot.utils.common import get_own_methods

""" 
todo
如果未注册对应的适配器，而且类响应器中定义了事件响应
两种方法，忽略或者报错，可以设置
 """


def cache_class_handler(class_handler: Callable, handler_name: str):

    #  不要每次都创建实例，on/register监听器新增时建立一次保存起来即可
    class_handler_instance = class_handler()

    # groupHandler可能有多个装饰器，比如register, withCommand
    # 先解析为与装饰器名称相关的缓存至groupMeta，
    # 解析完所有装饰器之后，再生成classHandlers.groupCache中的缓存
    # 生成缓存时，确保register的存在，不然报错(withCommand也可以向group中推送meta信息)
    # 这才是真正的meta，全局保存class和对应的meta，而不是绑定到class上，可能会涉及到bound和unbound的问题

    event_handlers: Dict[str, Callable] = {}

    # 初始化时，遍历生成缓存，不要每次接收到消息都去遍历
    for method in get_own_methods(class_handler_instance):
        method_name = method.__name__

        # todo 多protocol合并的事件
        # if not is_valid_group_method(method_name):
        #     # if is_valid_friend_method(method.__name__):
        #     raise EventHandlerDefineError(f"")

        # if not is_valid_event_handler(class_handler, method, method_name):
        #     raise EventHandlerDefineError(f"")

        event_handlers[method_name] = method

    class_handler_mapping[handler_name] = ClassHandlerCache(
        class_instance=class_handler_instance,
        event_handlers=event_handlers,
    )
    # 是否可以只实例化一次botInstance？动态注入groupId
    # 似乎每个群一个bot，效果更好一点
    # 为每一个group，缓存一个GroupCommonBot
    # botInstance=construct_GroupCommonBot({"group_id": id}, cast(Any, None)),


def cache_class_command(class_command: Callable, command_name: str):
    # 多个group handler，相同command的处理(解析所有指令和groupId，重新生成缓存)
    # 同一个commandClass，就实例化一次

    # if lifecycle_name not in get_own_methods():

    class_command_instance = class_command()
    command_method_mapping = {}

    for method in get_own_methods(class_command_instance):
        method_name = method.__name__

        patterns: List[Tuple[str, T_PatternArg]] = []
        compressed_patterns = []

        if method_name not in LIFECYCLE_WITHOUT_PATTERNS:
            signature = inspect.signature(method)

            for arg_name, p in signature.parameters.items():

                if p.default == "PatternArg":
                    annotation = p.annotation
                    if annotation not in runtime_pattern_arg_types:
                        raise InitializationError(f"仅支持str, bool, int, float和所有消息类型")

                    # 未具体指定类型(int, float, bool)的Text按照str处理
                    patterns.append(
                        (arg_name, annotation if annotation != Text else str)
                    )

            # debug(patterns)

            compressed_patterns = merge_text_of_patterns(patterns)
        # debug(compressed_patterns)

        command_method_mapping[method_name] = CommandMethodCache(
            method=method,
            patterns=patterns,
            compressed_patterns=compressed_patterns,
        )

    class_command_mapping[command_name] = ClassCommandCache(
        class_instance=class_command_instance,
        command_method_mapping=command_method_mapping,
    )

    command_config: CommandConfig = getattr(class_command, COMMAND_CONFIG)

    class_command_config_mapping[command_name]["default"] = command_config

    # debug(commandKwargs)

    # command_methods = {}
    # for method in get_own_methods(class_command_instance):
    #     method_name = method.__name__

    #     if not is_valid_command_method(method):
    #         raise ClassCommandDifinationError()

    #     commandBuffer.methods[method.__name__] = method

    # if "initial" not in command_methods.keys():
    #     raise ClassCommandDifinationError()

    # commandBuffer = ClassCommandCache(
    #     instance=class_command_instance,
    #     kwargs=command_kwargs,
    #     methods=command_methods,
    # )

    # classHandlers.commandCache[commandClass] = commandBuffer

    # maxSize = commandKwargs["maxSize"]
    # timeout = commandKwargs["timeout"]
    # mode = commandKwargs["mode"]

    # commandContext = CommandContext(
    #     maxSize=maxSize or globalContext.maxSize,
    #     timeout=timeout or globalContext.timeout,
    #     mode=mode,
    # )

    # globalContext.cache[commandClass] = commandContext

    # class_command_mapping


def cache_route_validator(validator: Callable, validator_name: str):
    route_validator_mapping[validator_name] = validator

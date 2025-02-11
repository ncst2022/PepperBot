import json
from typing import Any, Iterable

from devtools import pformat
from pepperbot.core.event.handle import handle_event
from pepperbot.core.route.parse import parse_routes
from pepperbot.exceptions import EventHandleError
from pepperbot.extensions.log import logger
from pepperbot.store.meta import BotRoute
from pepperbot.types import T_BotProtocol, T_WebProtocol
from sanic import Sanic, text


def create_web_routes(
    app: Sanic,
    receive_protocol: T_WebProtocol,
    uri: str,
    request_handler: Any,
):
    if receive_protocol == "http":
        app.add_route(
            handler=request_handler,
            uri=uri,
            methods=["POST"],
        )

    else:
        app.add_websocket_route(
            handler=request_handler,
            uri=uri,
        )


def create_bot_routes(routes: Iterable[BotRoute]):
    parse_routes(routes)


async def http_receiver(request, protocol: T_BotProtocol):
    try:
        raw_event = request.json

        logger.debug(pformat(raw_event))
        await handle_event(protocol, raw_event)

    except EventHandleError as e:
        logger.exception(e)

    except Exception:
        logger.exception("事件处理异常")

    finally:
        return text("")


async def websocket_receiver(request, ws, protocol: T_BotProtocol):
    while True:
        try:
            data = await ws.recv()
            raw_event = json.loads(data)

            logger.debug(pformat(raw_event))
            await handle_event(protocol, raw_event)

        except EventHandleError as e:
            logger.exception(e)

        except Exception:
            logger.exception("事件处理异常")

import { MediaPlayerClass, MediaPlayer } from "dashjs";
import { getGogoEnv } from "../gogo";

export class DashVideoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DashVideoError";
    }
}

export interface GogoPlayer {
    player: MediaPlayerClass;
}

export function newPlayer(
    vId: string,
    autoplay = false,
): GogoPlayer | undefined {
    const env = getGogoEnv();
    if (!env) {
        return undefined;
    }

    try {
        const vEl = getVideoElement(vId);
        const player = MediaPlayer().create();
        player.initialize(vEl, env.gogoUrl, autoplay);
        return {
            player,
        };
    } catch (e) {
        console.error(e);
    }
}

function getVideoElement(vId: string): HTMLVideoElement | undefined {
    const el = document.getElementById(vId);

    if (!el) {
        throw new DashVideoError(
            "Video element with video id: " + vId + " not found.",
        );
    }
    if (!(el instanceof HTMLVideoElement)) {
        throw new DashVideoError(
            "Provided element with id: " + vId + " is not a video element.",
        );
    }

    return el;
}

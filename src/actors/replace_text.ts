import { VersionMap } from "@/lib/version_map";
import { Actor } from "excalibur";

export class ReplaceText extends Actor {
    target: HTMLElement;
    state: VersionMap;

    private patternText: string;

    constructor(target: HTMLElement) {
        super();
        this.target = target;
        this.state = new VersionMap();
    }

    override onInitialize() {
        this.patternText = this.target.innerHTML;
    }

    override onPreUpdate() {
        if (this.state.isDirty()) {
            var newHtml = this.patternText;
            for (const [key, value] of this.state.entries()) {
                const regex = new RegExp(`\\{${key}\\}`, 'g');
                newHtml = newHtml.replace(regex, value);
            }
            this.target.innerHTML = newHtml;
            this.state.setClean();
        }
    }
}
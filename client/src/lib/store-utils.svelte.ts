export class LoadUtil {
	waiting = $state(false);
	constructor() {}
	wait() {
		this.waiting = true;
	}
	unwait() {
		this.waiting = false;
	}
}

export const loadUtil = new LoadUtil();

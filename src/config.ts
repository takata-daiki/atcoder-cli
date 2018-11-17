type Conf = import("conf");

export const defaults = {
	["oj-path"]: null,
	["default-contest-dirname-format"]: "{ContestID}",
	["default-task-dirname-format"]: "{tasklabel}"
};

/**
 * 常に単一のConfインスタンスを返す関数
 */
const getConfig: () => Promise<Conf> = (() => {
	// confはsingletonとして扱う
	let conf: Conf | null = null;
	return async () => {
		if (conf !== null) return conf;
		const Conf = (await import("conf")).default;
		return conf = new Conf({defaults});
	}
})();

export default getConfig;

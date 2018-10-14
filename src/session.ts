import rq from "request";
import request from "request-promise-native"

/**
 * セッション管理用クラス
 * こいつでcookieを使いまわしてログイン認証した状態でデータをとってくる
 */
export class Session {
	private readonly _jar: rq.CookieJar;
	get jar(): rq.CookieJar {
		return this._jar;
	}

	constructor(jar?: rq.CookieJar) {
		if (jar === undefined) {
			this._jar = request.jar();
		}
		else {
			this._jar = jar
		}
	}

	async fetch(uri: string, options: rq.CoreOptions = {}): Promise<rq.Response> {
		// requestの呼び出しによってthis.jarの内部状態が書き換わる
		return await
			request({
				uri,
				jar: this.jar,
				followAllRedirects: true,
				resolveWithFullResponse: true,
				...options
			});
	}
}
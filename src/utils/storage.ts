const get = (key:string) => {
	try {
		return JSON.parse(localStorage.getItem(key) as string);
	} catch (error) {
		return localStorage.getItem(key) || null;
	}
};

const set = (key:string, value:any) => {
	localStorage.setItem(key, JSON.stringify(value));
	return true;
};

const storage = { set, get }
export default storage;

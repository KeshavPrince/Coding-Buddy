export function getFromStorage(key) {
    if(!key) {
        return null;
    }
    else {
        try {
            let token = localStorage.getItem(key);
            if(!token) {
                return null;
            }
            else {
                return JSON.parse(token);
            }
        }
        catch(err) {
            return null;
        }
    }
}

export function setInStorage(key, obj) {
    if(!key) {
        console.error('Error : key is Missing..');
    }
    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (error) {
        console.error(error);
    }
}
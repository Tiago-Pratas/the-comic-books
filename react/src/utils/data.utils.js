export function mapper(obj) {
    if (!obj) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((val) => mapper(val));
    }

    if (typeof obj !== 'object') {
        return obj;
    }

    return Object.entries(obj).reduce((accum, curr) => {
        const [key, val] = curr;
        const name = key === 'id' ? 'apiRef' : key;

        return {
            ...accum,
            [name]: mapper(val),
        };
    }, {});
}
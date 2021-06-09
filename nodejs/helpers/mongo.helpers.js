//functions to use as getters or setters in models

const removeNewlines = (aliases) => {
    if (aliases === null || aliases === '') return false;

    return aliases.split(/\r\n|\r|\n/);
};

const removeTags = (description) => {
    if (description === null || description === '') return false;

    return description.replace( /(<([^>]+)>)/ig, '');
};

const setPassword = (password) => {
    if (password === undefined) return null;
};

export {
    setPassword,
    removeNewlines,
    removeTags,
};

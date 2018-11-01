export const getListKey = (parentListId) => parentListId.split('-')[0]; // should match with keys in state.lists

export const fadeIn = (element, duration) => {
    element.style.display = 'flex';
    (function increment(value = 0) {
        element.style.opacity = String(value);
        if (element.style.opacity !== '1') {
            setTimeout(() => {
                increment(value + 0.1);
            }, duration / 10);
        }
    })();
};

export const fadeOut = (element, duration) => {
    (function decrement() {
        if ((element.style.opacity -= 0.1) < 0) {
            element.remove()
        } else {
            setTimeout(() => {
                decrement();
            }, duration / 10);
        }
    })();
};

export const findAndReplaceLinks = text => {
    const exp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return text.split(' ').map(word => {
        return word.replace(exp, match => {
            const href = match.includes('htt') ? match : `http://${match}`;
            return `<a href="${href}" target="_blank">${match}</a>`
        });
    }).join(' ');
    
};
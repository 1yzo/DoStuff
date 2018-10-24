import { store } from '../index';
import { setNewItemColor } from '../redux/actions/config';

const ColorPickerSingle = (hexValue) => {
    const picker = document.createElement('div');
    picker.className = 'color-picker';
    picker.style.backgroundColor = hexValue;
    picker.style.boxShadow = `0 1px 2px ${hexValue}`;
    picker.addEventListener('click', () => {
        const allPickers = document.querySelectorAll('.color-picker');
        allPickers.forEach(picker => {
            picker.classList.remove('color-picker--selected');
        });
        picker.classList.add('color-picker--selected');
        picker.style.boxShadow = `0 1px 2px #A5ADBA`;      
        store.dispatch(setNewItemColor(hexValue));
        document.querySelector('#add-input').focus();
    });

    return picker;
};

export default ColorPickerSingle;
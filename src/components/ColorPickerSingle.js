import { state } from '../index';

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
        state.newItemColor = hexValue;
    });

    return picker;
};

export default ColorPickerSingle;
const validateRequired = (value) => value && value.trim() != '';

const validateIsNumberAndPositive = (value) => !isNaN(value) && value > 0;

const validateIsIntegerAndPositive = (value) => Number.isInteger(Number(value)) && value > 0;

const validateImage = (file) => {
    if (!file) 
    {
        return false; 
    }    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return allowedTypes.includes(file.mimetype);
};


module.exports = {validateRequired, validateIsNumberAndPositive, validateIsIntegerAndPositive, validateImage};
const validators = require('../utils/validators');
const path = require('path');
const fs = require('fs');

const itemValidation = (req, res, next) => {

    const {nazov, popis, cena, pocet_ks} = req.body;
    const mainImage = req.files['mainImage']?.[0];
    const otherImages = req.files['otherImages[]'] || [];

    if (!validators.validateRequired(nazov) || !validators.validateRequired(cena) || !validators.validateRequired(pocet_ks)) {
        deleteImages(mainImage, otherImages);
        return res.status(400).json({ error: 'Názov, popis, cena a pocet kusov sú povinné!' });
    }

    if (!validators.validateIsNumberAndPositive(cena)) {
        deleteImages(mainImage, otherImages);
        return res.status(400).json({ error: 'Cena musí byť nezáporné číslo!' });
    }

    if (!validators.validateIsIntegerAndPositive(pocet_ks)) {
        deleteImages(mainImage, otherImages);
        return res.status(400).json({ error: 'Počet kusov musí byť celé nezáporné číslo!' });
    }

    if (mainImage && !validators.validateImage(mainImage))
    {
        deleteImages(mainImage, otherImages);
        return res.status(400).json({ error: 'Nahraný súbor nie je platný obrázok (musí byť JPG alebo PNG).' });
    }

    for (const image of otherImages)
    {
        if (image && !validators.validateImage(image))
            {
                deleteImages(mainImage, otherImages);
                return res.status(400).json({ error: 'Nahraný súbor nie je platný obrázok (musí byť JPG alebo PNG).' });
            }
    }

    next();
};

const deleteImages = (mainImage, otherImages) => {
    if (mainImage)
    {
        const filePath = path.join('uploads/images', mainImage.filename).replaceAll('\\', '/');
        fs.unlinkSync(filePath);
    }

    for (const otherImage of otherImages)
    {
        const filePath = path.join('uploads/images', otherImage.filename).replaceAll('\\', '/');
        fs.unlinkSync(filePath);
    }
};


module.exports = {itemValidation};
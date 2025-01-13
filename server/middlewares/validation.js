const validators = require('../utils/validators');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

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

// const quantityValidation = (req, res, next) => {

//     const {nazov, popis, cena, pocet_ks} = req.body;

//     if (!validators.validateRequired(nazov) || !validators.validateRequired(cena) || !validators.validateRequired(pocet_ks)) {
//         deleteImages(mainImage, otherImages);
//         return res.status(400).json({ error: 'Názov, popis, cena a pocet kusov sú povinné!' });
//     }

//     if (!validators.validateIsNumberAndPositive(cena)) {
//         deleteImages(mainImage, otherImages);
//         return res.status(400).json({ error: 'Cena musí byť nezáporné číslo!' });
//     }

//     if (!validators.validateIsIntegerAndPositive(pocet_ks)) {
//         deleteImages(mainImage, otherImages);
//         return res.status(400).json({ error: 'Počet kusov musí byť celé nezáporné číslo!' });
//     }

//     if (mainImage && !validators.validateImage(mainImage))
//     {
//         deleteImages(mainImage, otherImages);
//         return res.status(400).json({ error: 'Nahraný súbor nie je platný obrázok (musí byť JPG alebo PNG).' });
//     }

//     next();
// };

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

const userAuthentification = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {

        return res.status(401).json({ message: 'Prístup zamietnutý!' });
    }

    console.log(token);
    try {
        const decoded = jwt.verify(token, 'myKey');
        req.user = decoded;
        
        next();
    } catch (error) {
        res.status(403).json({ message: 'Neplatný token.' });
    }
};

const userAuthorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Prístup zamietnutý' });
        }
        next();
    };
};


module.exports = {itemValidation, userAuthentification, userAuthorize};
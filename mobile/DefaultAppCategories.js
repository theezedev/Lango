import uuid from 'react-native-uuid';


const generateDefaultCategories = (appLanguage) => {
    let appCategories = [];

    // Depending on the appLanguage, return different categories
    switch (appLanguage) {
        case 'en':
        case 'en-GB':
            appCategories = [
                { categoryID: uuid.v4(), category: 'Directional' },
                { categoryID: uuid.v4(), category: 'Numbers' },
                { categoryID: uuid.v4(), category: 'Questions' },
                { categoryID: uuid.v4(), category: 'Other' },
            ];
            break;
        case 'tr':
            appCategories = [
                { categoryID: uuid.v4(), category: 'Yön' }, // Directional
                { categoryID: uuid.v4(), category: 'Sayı' }, // Numbers
                { categoryID: uuid.v4(), category: 'Soru' }, // Questions
                { categoryID: uuid.v4(), category: 'Diğer' }, // Other
            ];
            break;
        default:
            appCategories = [
                { categoryID: uuid.v4(), category: 'Directional' },
                { categoryID: uuid.v4(), category: 'Numbers' },
                { categoryID: uuid.v4(), category: 'Questions' },
                { categoryID: uuid.v4(), category: 'Other' },
            ];
            break;
    }

    return appCategories;
};

export default generateDefaultCategories;

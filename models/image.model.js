module.exports = (sequelize, Sequelize) => {
    const Images = sequelize.define('images', {
        original_image: {
            type: Sequelize.TEXT,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('original_image');
                return rawValue ? ASSETS.getImageURL(rawValue, 'originalImages') : null;
            }
        },
        modified_image: {
            type: Sequelize.TEXT,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('modified_image');
                return rawValue ? ASSETS.getImageURL(rawValue, 'modifiedImages') : null;
            }
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
            allowNull: false,
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
            allowNull: false,
        },
    },
        {
            tableName: 'images',

        });


    // check field is exist or not in table --> return obj or null
    Images.isExistField = async (whereClause) => {
        return await Images.findOne({ where: whereClause })
    };

    return Images;
}

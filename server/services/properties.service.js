const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findAll = async () => {
    return await prisma.property.findMany({
        include: {
            buildings: {
                include: {
                    units: true
                }
            }
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });
};

const findById = async (id) => {
    return await prisma.property.findUnique({
        where: { id },
        include: {
            buildings: {
                include: {
                    units: true
                }
            }
        }
    });
};

const create = async (data) => {
    return await prisma.property.create({
        data: {
            name: data.name,
            type: data.type,
            managerName: data.managerName,
            accountantName: data.accountantName,
            buildings: {
                create: data.buildings?.map(b => ({
                    street: b.street,
                    number: b.number,
                    zip: b.zip,
                    city: b.city,
                    country: b.country,
                    description: b.description,
                    units: {
                        create: b.units?.map(u => ({
                            type: u.type,
                            number: String(u.number),
                            floor: parseInt(u.floor),
                            entrance: u.entrance,
                            rooms: parseFloat(u.rooms),
                            size: parseFloat(u.size),
                            coOwnershipShare: u.coOwnershipShare ? parseFloat(u.coOwnershipShare) : null,
                            constructionYear: u.constructionYear ? parseInt(u.constructionYear) : null,
                        }))
                    }
                }))
            }
        },
        include: {
            buildings: {
                include: {
                    units: true
                }
            }
        }
    });
};

module.exports = {
    findAll,
    findById,
    create
};

# Les data-url dans thumbnail doivent etre ajoutées a la main dans mongo

mongoimport --db=pixel_war_db --collection=users --file=users.json --jsonArray
mongoimport --db=pixel_war_db --collection=pixels --file=pixels.json --jsonArray
mongoimport --db=pixel_war_db --collection=pixelboards --file=pixelboards.json --jsonArray

mongodump --db=pixel_war_db --out=D:/Users/Anthony/Desktop/M2_miage/S1/javascript/ws/Pixel_WAR/mongo-seed
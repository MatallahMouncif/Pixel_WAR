# Présentation du projet

Ce projet consiste à creer et mettre en place une application Pixel Art 
à l'aide du framework web React, un serveur NodeJS ainsi qu'une
base de donnée Mongo.
<br><br>
L'objectif est de creer une application fiable, avec une architecture
de transfère de données cohérente ainsi qu'une gestion de compte utilisateur
et de droit d'accès.
<br><br>
En effet, un visiteur peut uniquement visualiser les pixelboards.<br>
Un utilisateur authentifié peut modifier un pixelboard.
Un admin peut creer des pixelboards.

# Installation

```bash
  git clone https://github.com/MatallahMouncif/Pixel_WAR.git
  cd Pixel_WAR/
```
Docker service should be started
```bash
  docker-compose build
  docker-compose up
```
Listening ports:
- React app: 3004
- NodeJS serve: 3003
- Mongo container: 27017

# Versions

Version de React : 18.2.0

NodeJS : ^16

NPM : ^8.13.2

Git : version non pertinente

# Membre d'équipe et tâches effectuées

## Anthony Malvesin
- Frontend:  Dark/Light theme
- Backend: Services
- Database: Architecture, import / dump
- Deployment: docker-compose / Dockerfiles 

## Quentin Bertramo
- Backend:
  - Services
  - Routes
  - Models
  - Middlewares
  (Sauf auth et add pixel)
- Frontend: Gestion du profil utilisateur
- Postman

## Djalil Moussa
- Frontend : 
  - Home (Affichage des PixelBoard)
  - PixelBoard Editor
  - HomeNavBar
  - App (Router)
  - Gestions des roles
  - Export PNG
  - Ajout d'un Pixel (avec vérification de la posibilité) 
- Backend : 
  - Passport auth
  - Add Pixel (avec l'option override)
  
## Mouncif Matallah
- Frontend : 
	- SignIn
	- SignUp
	- Users
	- PixelBoardCreator
	- HomeNavBar (add SignIn, SignUp), Profile (add PixelBoardCreator)
	- App (Router)
- Backend : 
	- Creation Pixel Board

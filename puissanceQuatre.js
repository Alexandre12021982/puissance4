function creerLigneTableau()
{
    let tableauLigne = [];
    let nbrLigne = 7;

    for(let a = 0 ; a <= nbrLigne - 1; a++)
    {
        tableauLigne.push("");
    };

    return tableauLigne;
}

function creerColonneTableau()
{
    let tableauColonne = [];
    let nbrColonne = 7;

    for(let a = 0 ; a <= nbrColonne; a++)
    {
        tableauColonne.push(creerLigneTableau());
    };

    return tableauColonne;
}

function afficherMatrice(tab) 
{
    let affichagetable = "<table>"
    for(let a = 0 ; a <= tab.length - 1; a++) 
    {
        affichagetable = affichagetable + "<tr>";
        for(let b = 0 ; b <= tab[a].length - 1; b++)
        {
            affichagetable = affichagetable + "<td>" + tab[a][b] + "</td>";
        }
        affichagetable = affichagetable + "</tr>"
    }
    affichagetable = affichagetable + "</table>"
    return affichagetable;
}

function calculeNombreDeTour()
{
    nombreDeTour = nombreDeTour + 1;
}

function joueur(defini_le_joueur)
{
    if(nombreDeTour % 2 == 0)
    {
        defini_le_joueur = "X";
    }
    else
    {
        defini_le_joueur = "O";
    }

    return defini_le_joueur;
}

function parcourirColonne()
{
    let numeroDeColonne = prompt("saisir votre nombre entre 1 et 6");
    numeroDeColonne = parseInt(numeroDeColonne);
    if (numeroDeColonne >= 0 && numeroDeColonne < 7)
    {
        return numeroDeColonne;
    }
    else
    {
        parcourirColonne()
    }
}

function parcourirLigne()
{
    // Parcours les lignes jusqu'a trouver un obstacle
    for(var ligne = 0 ; ligne <= plateau.length - 1; ligne++)
    {
        if (ligne == plateau.length - 1 && (plateau[ligne][colonne] != "X" ||  plateau[ligne][colonne] != "O"))
        {
            // Met le jeton sur la derniere case
            plateau[ligne][colonne] = numeroJoueur;

            // Verifie les pts 
            droite_gauche(ligne);
            haut_bas(ligne)
            diagonale_haut_gauche(ligne)

            break;
        }

        else if (plateau[ligne + 1][colonne] == "X" || plateau[ligne + 1][colonne] == "O")
       {
            // Met le jeton sur la case au dessus
            plateau[ligne][colonne] = numeroJoueur;

            // Verifie les pts 
            droite_gauche(ligne);
            haut_bas(ligne)
            diagonale_haut_gauche(ligne)
            diagonale_haut_droite(ligne)

            break;
       }
        
    };
}

function droite_gauche(ligne)
{
    let score = -1;
    let y = 0;
    let x = 0;

    while (plateau[ligne][colonne + y] == numeroJoueur)
    {
        score = score + 1;
        if ((colonne + y) == (plateau.length - 1))
        {
            break;
        }
        else
        {
            y = y + 1;
        }
       
    }

    while (plateau[ligne][colonne - x] == numeroJoueur)
    {
        score = score + 1;
        if ((colonne - x) == 0)
        {
            break;
        }
        else
        {
            x = x + 1;
        }
    }

    if (score >= 4)
    {
        victoire = true;
        return victoire;
    }
}

function haut_bas(ligne)
{
    let score = -1;
    let y = 0;
    let x = 0;
    
    while (plateau[ligne + y][colonne] == numeroJoueur)
    {
        score = score + 1;
        if ((ligne + y) == (plateau.length - 1))
        {
            break;
        }
        else
        {
            y = y + 1;
        }
    }

    while (plateau[ligne - x][colonne] == numeroJoueur)
    {
        score = score + 1;
        if ((ligne - x) == 0)
        {
            break;
        }
        else
        {
            x = x + 1;
        }
    }

    if (score >= 4)
    {
        victoire = true;
    }
}

function diagonale_haut_gauche(ligne)
{
    let score = -1;
    let y = 0;
    let x = 0;
    
    while (plateau[ligne - y][colonne - y] == numeroJoueur)
    {
        score = score + 1;
        if ((ligne - y) == 0 || (colonne - y) == 0)
        {
            break;
        }
        else
        {
            y = y + 1;
        }
    }

    while (plateau[ligne + x][colonne + x] == numeroJoueur)
    {
        score = score + 1;
        if ((ligne + x) == (plateau.length - 1) || (colonne + x) == (plateau.length - 1))
        {
            break;
        }
        else
        {
            x = x + 1;
        }
    }

    if (score >= 4)
    {
        victoire = true;
        return victoire;
    }
}

function diagonale_haut_droite(ligne)
{
    let score = -1;
    let y = 0;
    let x = 0;
    
    while (plateau[ligne - y][colonne + y] == numeroJoueur)
    {
        score = score + 1;
        if ((ligne - y) == 0 || (colonne + y) == (plateau.length - 1))
        {
            break;
        }
        else
        {
            y = y + 1;
        }
    }

    while (plateau[ligne + x][colonne - x] == numeroJoueur)
    {
        score = score + 1;
        if ((ligne + x) == (plateau.length - 1) || (colonne - x) == 0)
        {
            break;
        }
        else
        {
            x = x + 1;
        }
    }

    if (score >= 4)
    {
        victoire = true;
        return victoire;
    }

}

function victory()
{
    if (victoire == true)
    {
        plateau = creerColonneTableau();
        victoire = false;
    }
}

function updateBtn() 
{
    // Ajoute 1 au nombre de tour 
    calculeNombreDeTour();

    // Defini le joueur 
    numeroJoueur = joueur(numeroJoueur);

    // Recupere le numero de colonne 
    colonne = parcourirColonne();

    // Met le jeton
    parcourirLigne()

    // Affiche le plateau
    let affichePlateau = document.getElementById("plateau");
    affichePlateau.innerHTML = afficherMatrice(plateau);

    victory();
}


let victoire = false;

// Creation du tableau 
let plateau = creerColonneTableau();

// Affiche le plateau
let affichePlateau = document.getElementById("plateau");
affichePlateau.innerHTML = afficherMatrice(plateau);

// Nombre de tour 
let nombreDeTour = 0;

// Joueur 
let numeroJoueur;

// Numero de colonne 
let colonne;

// Bouton lancer 
let btn = document.getElementById("bouton");
btn.addEventListener('click', updateBtn);
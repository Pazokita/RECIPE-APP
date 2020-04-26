import React from 'react'

const Header = ( { pseudo }) => {
    
    //focntion pour changer le de en d' si le pseudo mommence par une voyelle
    const formatPseudo = pseudo => /[aeiouy]/i.test(pseudo[0]) ? `d'${pseudo}` : `de ${pseudo}`
    //console.log (formatPseudo(pseudo))
    return (
        <header>
            <h1>La boîte à recettes {formatPseudo(pseudo)}</h1>
        </header>
    )
}


export default Header 

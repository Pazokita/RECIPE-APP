import React, { Component } from 'react'
// CSS
import './App.css'
import Header from './components/Header'
import Admin from './components/Admin'
import Card from './components/Card'
import recettes from './recettes'

//Firebase
import base from './base'

class App extends Component {
//  constructor (props) {
 //    super(props)
 //   this.state = {
  //    pseudo: this.props.match.params.pseudo,
   //   recettes: {},
    //  update: false
  //  }
  //  console.log('Constructor')
 // }
  
  state = {
  pseudo: this.props.match.params.pseudo,
  recettes: {}
  }

  //synchronisation avec la base de données Firebase ou API si c'est le cas (pas ici)
  componentDidMount () {
    this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
      context:this,
      state: 'recettes'
    })
   // this.setState({ update: true })
    //console.log('componentDidMount')
  }

  //componentDidUpdate () {
   // console.log('componentDidUpdate')
  //}

  //lorsqu'on change de page la connection se termine entre notre stat et firebase
  componentWillUnmount () {
    base.removeBinding(this.ref)
  }

  //méthode ajouterRecette avec une clé unique
  ajouterRecette = recette => {
    const recettes = { ...this.state.recettes }
    recettes[`recette-${Date.now()}`] = recette
    this.setState({ recettes })
  }

  //mettre à jour   
  majRecette = (key, newRecette) => {
    const recettes = { ...this.state.recettes }
    recettes[key] = newRecette
    this.setState({ recettes })
  }

  supprimerRecette = key => {
    const recettes = { ...this.state.recettes }
    recettes[key] = null
    this.setState({ recettes }) 
  }
  
  //méthode pour charger les recettes d'exemple
  chargerExemple = () => this.setState({ recettes })

  render () {
    //on transforme les recettes en tableau
    const cards = Object.keys(this.state.recettes)
    //console.log(cards)
    //je boucle autour grâce au map
      .map(key => <Card key={key} details={this.state.recettes[key]} />) 
    
    return (
      <div className='box'>
        <Header pseudo={this.state.pseudo} />
        <div className='cards'>
          <div className='card'>
            { cards }
          </div>
        </div>
        <Admin
            pseudo={this.state.pseudo}
            recettes={this.state.recettes}
            ajouterRecette={this.ajouterRecette}
            majRecette={this.majRecette}
            supprimerRecette={this.supprimerRecette}
            chargerExemple={this.chargerExemple} />
      </div>
    )
  }
}

export default App

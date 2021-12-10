// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomePagesController {
  public async index({ view }) {
    return view.render('welcome')
  }

  public async wallet({ view }) {
    return view.render('wallet')
  }

  public async profil({ view }) {
    return view.render('profil')
  }

  public async createNft({ view }) {
    return view.render('createnft')
  }

  public async login({ view }) {
    return view.render('signin')
  }

  public async register({ view }) {
    return view.render('signup')
  }
}

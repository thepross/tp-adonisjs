// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateArticleValidator from 'App/Validators/CreateArticleValidator'
import Article from 'App/Models/Article'
import Application from '@ioc:Adonis/Core/Application'

export default class ArticlesController {
  public async index({ view }) {
    // fetch data from sql
    const articles = await Article.all()
    return view.render('article/view', { articles })
  }

  public create({ view }) {
    return view.render('article/create')
  }

  public async store({ response, request }) {
      const payload = await request.validate(CreateArticleValidator)
    const image = request.file('image')
    // console.log(image)
    // return payload;
    if (image) {
        console.log('subiendo!')
      await image.moveToDisk('./articles')
    //   await image.move(Application.publicPath('imgs'), {// => /public/custom-name.jpg
    //     name: image.fileName,
    //     overwrite: true
    //   })
    }
    payload.image = image.fileName
    await Article.create(payload)

    return response.redirect().back()
  }

  public async edit({ view, params }) {
    const article = await Article.findBy('slug', params.slug)
    return view.render('article/edit', { article })
  }

  public async update({ request, response, params }) {
    const payload = await request.validate(CreateArticleValidator)
    await Article.query().where('slug', params.slug).update(payload)
    return response.redirect().back()
  }

  public async destroy({ response, params }) {
    const article = await Article.findBy('slug', params.slug)
    if (article) {
      article.delete()
      return response.redirect().back()
    }
  }

  public async show({ view, params }) {
    const article = await Article.findBy('slug', params.slug)
    return view.render('article/show', { article })
  }
}

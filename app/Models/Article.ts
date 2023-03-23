import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Drive from '@ioc:Adonis/Core/Drive'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string
  @column()
  public slug: string
  @column()
  public content:string
  @column()
  public image: string
  


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createSlug(article: Article) {
    article.slug = article.$dirty.title.replace(' ', '-').trim() + +new Date();
  }

  @computed()
  public async imageUrl() {
    return this.image ? await Drive.getUrl(this.image!) : "ss"
  }
}

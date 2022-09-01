import fs from 'fs'
import { parse } from 'csv-parse'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IImportCategory {
  name: string;
  description: string;
}
class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []

      const parseFile = parse()

      stream.pipe(parseFile)

      parseFile.on("data", async (line) => {
        //desestruturando o array: ["name", "description"]
        const [name, description] = line
        categories.push({
          name,
          description
        })
      })
        .on("end", () => {
          //a linha abaixo serve para remover o arquivo da pasta tmp após ser lido
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on("error", (err) => {
          reject(err)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(async (category) => {
      const { name, description } = category

      const existCategory = this.categoriesRepository.findByName(name)

      if (!existCategory) {
        this.categoriesRepository.create({
          name,
          description
        })
      }
    })
  }
}

export { ImportCategoryUseCase }
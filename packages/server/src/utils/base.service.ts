import { Inject } from 'phecda-server'
import type { ReturnModelType } from '@typegoose/typegoose'
import type { FilterQuery } from 'mongoose'

@Inject
export abstract class BaseService<T extends new (...args: any) => any> {
  abstract readonly Model: ReturnModelType<T>

  find(data?: FilterQuery<InstanceType<T>>, limit = 10, skip = 0) {
    return this.Model.find(data).limit(limit).skip(skip)
  }

  findOne(data: FilterQuery<InstanceType<T>>) {
    return this.Model.findOne(data)
  }

  findById(id: string) {
    return this.Model.findById(id)
  }

  create(data: Omit<InstanceType<T>, '_id' | 'id'>) {
    const model = new this.Model(data)

    return model.save()
  }

  update(id: string, data: Partial<T>) {
    return this.Model.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  delete(id: string) {
    return this.Model.findByIdAndDelete(id).exec()
  }
}

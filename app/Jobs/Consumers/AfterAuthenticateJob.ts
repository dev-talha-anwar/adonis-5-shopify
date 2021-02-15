/**
 * Sample job consumer class
 *
 * @version 1.0.0
 * @adonis-version 5.0+
 */
import Api from 'App/Helpers/Api'
import Product from 'App/Models/Product'


export default class AfterAuthenticateJob {
  public data: any
  public ctx: any

  /**
   * Concurrency for processing this job
   * @return {Int} Num of jobs processed at time
   */
  public static get concurrency() {
    return 1
  }

  /**
   * UUID for this job class
   * Make sure consumer and producer are in sync
   * @return {String}
   */
  public static get type() {
    return 'after-authenticate-job'
  }

  /**
   * Inject custom payload into the job class
   * @param  {Object} data
   *
   * DO NOT MODIFY!
   */
  constructor(data) {
    this.data = data
  }

  /**
   * Inject the kue ctx to the consumer, you can use it to
   * pause(), shutdown() or remove() handler actions.
   * See kue's doc for more details
   * @param  {Object} data
   *
   * DO NOT MODIFY!
   */
  public setContext(ctx) {
    this.ctx = ctx
  }

  /**
   * Handle the sending of email data
   * You can drop the async keyword if it is synchronous
   */
  public async handle() {
    let shop = await Api.rest(this.data.shop)
    let params = { limit: 250, fields: 'id' };
    do {
      const response = await shop.product.list(params);
      let productsData: any = []
      for (var key in response) {
        if (response.hasOwnProperty(key)) {
          productsData.push({
            product_id: response[key]['id']
          })
        }
      }
      await Product.updateOrCreateMany('product_id', productsData)
      params = response.nextPageParameters;
    } while (params !== undefined);
  }
}

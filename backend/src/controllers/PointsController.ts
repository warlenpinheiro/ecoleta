import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');


    return response.json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    
    const point = await knex('points').where('id', id).first();

    if(!point) {
      return response.status(400).json({ message: 'Point not found.' });
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'points_items.item_id')
      .where('point_items.point_id', id);

    const address = await knex('address').where('id', point.address_id).first();

    return response.json({point, items, address});
  }

  async create(request: Request, response: Response) {
    const {
      name,
      whatsapp,
      email,
      cep,
      number,
      city,
      uf,
      logradouro,
      bairro,
      latitude,
      longitude,
      items
    } = request.body;

    const address = {
      cep,
      number,
      city,
      uf,
      logradouro,
      bairro,
      latitude,
      longitude
    }

    const point = {
      name,
      whatsapp,
      email,
      address
    }
  
    const trx = await knex.transaction();
  
  
    const ids = await trx('address').insert({
      cep,
      number,
      city,
      uf,
      logradouro,
      bairro,
      latitude,
      longitude
    });
  
    const ids_points = await trx('points').insert({
      image: 'https://www.proaresiduos.com.br/wp-content/uploads/2014/11/o-que-e-coleta-residuos.jpg',
      name,
      whatsapp,
      email,
      address_id: ids[0]
    });
  
    const point_items = items.map( (item_id: number) => {
      return {
        item_id,
        point_id: ids_points[0]
      };
    });
  
    await trx('point_items').insert(point_items);

    await trx.commit();

    return response.json({
      id: ids_points[0],
      ...point
    });
  }
}

export default PointsController;
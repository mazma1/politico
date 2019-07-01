import { Party } from '../../../models';
import helpers from '../../../utils/helpers';
import paginate from '../../../utils/paginate';
import response from '../../../utils/responseWrapper';
import { validationHandler } from '../middleware/validateInput';

const partyController = {
  createParty: async (req, res) => {
    const validationError = validationHandler(req);

    if (Object.keys(validationError).length > 0) {
      return response(422, { errors: validationError }, res);
    }

    const { name, hqAddress, logoUrl } = req.body;
    try {
      const [party, wasCreated] = await Party.findOrCreate({
        where: { name: helpers.titleCase(name) },
        defaults: { hqAddress, logoUrl },
      });
      if (!wasCreated) {
        return response(409, { error: 'Party already exists' }, res);
      }
      return response(201, { data: party }, res);
    } catch (error) {
      return response(500, { error: error.message }, res);
    }
  },

  updateParty: async (req, res) => {
    const validationError = validationHandler(req);

    if (Object.keys(validationError).length > 0) {
      return response(422, { errors: validationError }, res);
    }

    const party = await Party.findByPk(req.params.id);
    if (!party) {
      return response(404, { error: 'Party not found' }, res);
    }
    try {
      const updatedParty = await party.update(req.body);
      return response(200, { data: updatedParty }, res);
    } catch (error) {
      return response(500, { error: error.message }, res);
    }
  },

  deleteParty: async (req, res) => {
    const party = await Party.findByPk(req.params.id);
    if (!party) {
      return response(404, { error: 'Party not found' }, res);
    }
    try {
      await party.destroy();
      return response(200, { message: `${party.name} successfully deleted` }, res);
    } catch (error) {
      return response(500, { error: error.message }, res);
    }
  },

  getParties: async (req, res) => {
    const { currentPage = 1, pageSize = 2 } = req.query;

    try {
      const parties = await Party.findAndCountAll({
        attributes: ['name', 'hqAddress', 'logoUrl'],
        ...paginate({ currentPage, pageSize }),
      });
      const payload = { data: { parties: parties.rows, count: parties.count } };
      return response(200, payload, res);
    } catch (error) {
      return response(500, { error: error.message }, res);
    }
  },

  getParty: async (req, res) => {
    try {
      const party = await Party.findByPk(req.params.id, {
        attributes: ['name', 'hqAddress', 'logoUrl'],
      });
      return party && response(200, { data: party }, res);
    } catch (error) {
      if (error.message.includes('invalid input syntax for type uuid') || error.message.search(/invalid input syntax for type uuid/)) {
        return response(404, { error: 'Party with specified ID not found' }, res);
      }
      return response(500, { error: error.message }, res);
    }
  },
};

export default partyController;

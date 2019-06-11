import { Party } from '../../../models';
import helpers from '../../../utils/helpers';
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
};

export default partyController;

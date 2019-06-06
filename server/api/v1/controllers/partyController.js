import { Party } from '../../../models';
import response from '../../../utils/responseWrapper';
import helpers from '../../../utils/helpers';

const partyController = {
  createParty: async (req, res) => {
    const { name, hqAddress } = req.body;

    try {
      const [party, wasCreated] = await Party.findOrCreate({
        where: { name: helpers.titleCase(name) },
        defaults: { hqAddress },
      });
      if (!wasCreated) {
        return response(409, { error: 'Party already exists' }, res);
      }
      return response(201, { data: party }, res);
    } catch (error) {
      return response(500, { error: error.message }, res);
    }
  },
};

export default partyController;

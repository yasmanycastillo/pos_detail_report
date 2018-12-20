# -*- coding: utf-8 -*-
import logging
import requests
from odoo import models, fields, api
_logger = logging.getLogger(__name__)


class PosOrder(models.Model):
    _inherit = 'pos.order'

    @api.model
    def _get_rate(self):
        # import ipdb; ipdb.set_trace()
        res = requests.get("http://api.marcos.do/central_bank_rates")
        if res:
            result = res.json()
            return float(result['dollar'].get('selling_rate'))
        return 0.0

    @api.model
    def _set_rate(self):
        for order in self:
            order.rate = self._get_rate()

    usd_amount = fields.Float()
    rate = fields.Float(compute=_set_rate)

    # @api.model
    # def get_rate(self, name):
    #     res = {"rate": 0.0}
    #     order_id = False
    #     while not order_id:
    #         time.sleep(1)
    #         if time.time() > timeout:
    #             break
    #         self._cr.commit()
    #         order_id = self.search([('pos_reference', '=', name)])
    #
    #     if order_id:
    #         res.update({
    #             "rate": self._set_rate()
    #         })
    #
    #         _logger.info("RATE WAS DEFINE")
    #         return res
    #     else:
    #         return False

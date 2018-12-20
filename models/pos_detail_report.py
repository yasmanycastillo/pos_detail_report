# -*- coding: utf-8 -*-
from odoo import models, fields, api


class ReportSaleDetailsExtended(models.AbstractModel):
    _inherit = 'report.point_of_sale.report_saledetails'

    @api.multi
    def render_html(self, docids, data=None):
        data = dict(data or {})
        configs = self.env['pos.config'].browse(data['config_ids'])
        data.update(self.get_sale_details(data['date_start'], data['date_stop'], configs))

        tip_total = 0.0
        for k, v in data.iteritems():
            if k == 'products':
                for rec in v:
                    if rec['code'] == 'POSTIP':
                        tip_total += rec['price_unit']

        data['payments'].append({'name': 'Propina', 'total': tip_total})
        return self.env['report'].render('point_of_sale.report_saledetails', data)

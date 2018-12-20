# -*- coding: utf-8 -*-
{
    'name': "POS: Modified Detail Report",
    'summary': """
        This module add some changes in detail report to show tip details and USD total in receipt.""",
    'description': """
    """,
    'author': "Yasmany Castillo",
    'website': "",
    'category': 'POS',
    'version': '0.1',
    'depends': ['point_of_sale'],
    'data': [
        # 'security/ir.model.access.csv',
        'views/report_saledetails.xml',
        'views/point_of_sale_report.xml',
        'views/report_sessionsummary.xml',
        'views/template.xml',
    ],
    'qweb': [
        'static/src/xml/pos.xml',
    ],
}

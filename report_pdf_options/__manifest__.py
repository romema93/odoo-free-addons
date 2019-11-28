# -*- coding: utf-8 -*-
{
    'name': 'Pdf report options',
    'summary': """Shows options in pdf reports""",
    'author': 'Luis Rodrigo Mejia Mateus',
    'category': 'Productivity',
    'depends': ['report'],
    'data': [
        'views/templates.xml',
        'views/ir_actions_report.xml',
    ],
    'qweb': [
        'static/src/xml/report_pdf_options.xml'
    ],
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3'
}

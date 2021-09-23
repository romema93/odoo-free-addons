odoo.define('pdf_report_options.PdfOptions', function (require) {
    "use strict";

    var Session = require('web.Session');

    // Session
    Session.include({
        /**
         * @override
         */
        get_file: function (options) {
            var pdfOpen = false;
            var pdfPrint = false;
            if (options.data) {
                if (options.data.data) {
                    pdfOpen = options.data.data.indexOf('"open"');
                    pdfPrint = options.data.data.indexOf('"print"');
                }
            }
            if (pdfOpen !== -1 || pdfPrint !== -1) {
                var token = new Date().getTime();
                options.session = this;
                var params = _.extend({}, options.data || {}, {token: token});
                var url = options.session.url(options.url, params);
                if (pdfOpen !== -1) {
                    if (options.success) {
                        options.success();
                    }
                    if (options.complete) {
                        options.complete();
                    }
                    var w = window.open(url);
                    //return !(!w || w.closed || typeof w.closed === 'undefined');

                } else if (pdfPrint !== -1) {
                    let securePrint = true;
                    $('#frame-pdf').remove();
                    $('<iframe style="display: none;">')
                        .attr({id: 'frame-pdf', src: url, name: 'frame-pdf'})
                        .appendTo(document.body)
                        .on("load", function (responseText, textStatus, jqXHR) {
                            if (securePrint) {
                                let iframe = window.frames['frame-pdf'];
                                iframe.focus();
                                iframe.print();
                                if (options.success) {
                                    options.success();
                                }
                                if (options.complete) {
                                    options.complete();
                                }
                            }
                            securePrint = false;
                        });
                }
                return true;
            } else {
                return this._super.apply(this, arguments);
            }
        }
    });
});

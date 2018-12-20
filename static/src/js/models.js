odoo.define('pos_detail_report.models', function(require){
"use strict";

    var models = require('point_of_sale.models');
    // var screens = require('point_of_sale.screens');
    var Model = require('web.DataModel');
    var core = require('web.core');
    // var utils = require('web.utils');
    var QWeb = core.qweb;
    var _t = core._t;
    var round_pr = utils.round_precision;

    var exports = {};
    var _super_order = models.Order.prototype;

    models.Order = models.Order.extend({
        initialize: function (attributes, options) {
            // var self = this;
            this.rate = null;
            this.usd_amount = null;

            if (options.json) {
                this.init_from_JSON(options.json);
            } else {
                this.rate = this.get_rate();
            }
            _super_order.initialize.apply(this, arguments);
        },
        export_as_JSON: function() {
            var json = _super_order.export_as_JSON.apply(this, arguments);
            json.rate = this.get_rate();
            json.usd_amount = parseFloat(self.get_total_with_tax()) / json.rate;
            console.info("JSON", json);
            return json;
        },
        init_from_JSON: function(json) {
            console.info("JSON", json);
            this.rate = json.rate;
            _super_order.init_from_JSON.call(this, json);
        },
        get_rate: function () {
            return  new Model('pos.order').call("_get_rate");
        },
        get_usd_total: function () {
            var self = this;
            var rate = null;
            var total = parseFloat(self.get_total_with_tax());
            if (!this.rate) {
                rate = this.get_rate();
            } else {
                rate = this.rate;
            }
            this.usd_amount = total / rate;
            // order.usd_amount = total / this.pos.rate;
            console.info("DATA RATE", this.get_rate());
            console.info("DATA RATE2", rate);
            console.info("DATA TOTAL", this.usd_amount);
            return round_pr(total / rate);
        },
        // get_total_without_tax: function() {
        //     return round_pr(this.orderlines.reduce((function(sum, orderLine) {
        //         return sum + orderLine.get_price_without_tax();
        //     }), 0), this.pos.currency.rounding);
        // },
    });
    // models.Order = models.Order.extend({
    //     initialize: function (attributes, options) {
    //         _super_order.initialize.apply(this, arguments);
    //         this.rate = null;
    //     },
    //     export_as_JSON: function() {
    //         var json = _super_order.export_as_JSON.apply(this, arguments);
    //         var current_order = this.pos.get_order();
    //         if (current_order != null) {
    //             console.info("INSIDE EXPORT ", current_order.rate)
    //             json.rate = current_order.amount_total / current_order.rate;
    //         }
    //
    //         return json;
    //     },
    //     init_from_JSON: function(json) {
    //         _super_order.init_from_JSON.call(this, json);
    //     },
    //     set_rate: function (rate) {
    //         this.rate = rate;
    //     },
    //     get_rate: function () {
    //         var self = this;
    //         var model = new Model('pos.order');
    //         var new_rate;
    //         var total = parseFloat(self.get_total_with_tax());
    //         var line = self.export_as_JSON();
    //         new_rate = line.rate;
    //         console.info("export_as_JSON ", line)
    //         console.info("export_as_JSON DATA", new_rate)
    //         new_rate = line.rate;
    //         // self.rate = model.call("_set_rate")
    //         // .done(function (rates) {
    //         //     new_rate = total / parseFloat(rates.dollar.selling_rate);
    //         // });
    //         // return new_rate;
    //         return round_pr(new_rate);
    //     },
    //     saveChanges: function(){
    //         _super_order.saveChanges.call(this, arguments);
    //     },
    // });

    // screens.ReceiptScreenWidget.extend({
    //     ncf_render_receipt: function (data) {
    //         var order = this.pos.get_order();
    //         console.info("ncf_render_receipt ", data)
    //         order.rate = data.rate;
    //         this.$('.pos-receipt-container').html(QWeb.render('PosTicket', {
    //             widget: this,
    //             order: order,
    //             receipt: order.export_for_printing(),
    //             orderlines: order.get_orderlines(),
    //             paymentlines: order.get_paymentlines(),
    //         }));
    //     },
    //     render_receipt: function () {
    //         var self = this;
    //         var order = this.pos.get_order();
    //         if (self.pos.config.iface_fiscal_printer === false) {
    //             new Model('pos.order').call("get_rate", [order.name]).then(function (data) {
    //                 self.ncf_render_receipt(data);
    //             });
    //         }
    //     },
    // });

    exports.models;
    return exports;
});

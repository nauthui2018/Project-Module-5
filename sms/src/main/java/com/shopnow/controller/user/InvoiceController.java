package com.shopnow.controller.user;

import com.shopnow.model.Invoice;
import com.shopnow.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/user/invoices")
public class InvoiceController {
    @Autowired
    InvoiceService invoiceService;
    @GetMapping
    public String index(){
        return "admin/invoice/invoice";
    }

    @GetMapping(value = "/{idInvoice}")
    public ModelAndView getInvoiceDetail(@PathVariable("idInvoice") Long idInvoice){
        Invoice invoice= invoiceService.findById(idInvoice);
        return new ModelAndView("admin/invoice/invoiceDetail","invoice",invoice);
    }
}

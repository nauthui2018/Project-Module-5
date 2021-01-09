package com.shopnow.controller.api.user;

import com.shopnow.model.Invoice;
import com.shopnow.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/user/invoice")
public class APIInvoice {
    @Autowired
    InvoiceService invoiceService;

    @GetMapping
    public ResponseEntity<List<Invoice>> listInvoice() {
        List<Invoice> invoices = invoiceService.findAll();
        return new ResponseEntity<>(invoices, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Invoice> saveInvoice(@RequestBody Invoice invoice) {
        invoiceService.save(invoice);
        return new ResponseEntity<>(invoice, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Invoice> getInvoice(@PathVariable("id") Long id){
        Invoice invoice= invoiceService.findById(id);
        if(invoice!=null)
            return new ResponseEntity<>(invoice,HttpStatus.OK);
        return new ResponseEntity<>(invoice,HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<Invoice> updateInvoice(@RequestBody Invoice invoice){
        invoiceService.save(invoice);
        return new ResponseEntity<>(invoice, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteInvoice(@PathVariable("id") Long id){
        return new ResponseEntity<>(invoiceService.deleteById(id), HttpStatus.OK);
    }
}

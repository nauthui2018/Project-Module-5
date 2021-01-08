package com.shopnow.controller.api.user;

import com.shopnow.model.InvoiceDetail;
import com.shopnow.model.Product;
import com.shopnow.service.InvoiceDetailService;
import com.shopnow.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/invoiceDetail")
public class APIInvoiceDetail {
    @Autowired
    InvoiceDetailService invoiceDetailService;

    @Autowired
    ProductService productService;

    @GetMapping
    public ResponseEntity<List<InvoiceDetail>> listInvoiceDetail() {
        List<InvoiceDetail> invoiceDetails = invoiceDetailService.findAll();
        return new ResponseEntity<>(invoiceDetails, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<InvoiceDetail> saveInvoiceDetail(@RequestBody InvoiceDetail invoiceDetail) {
        Product product= productService.findById(invoiceDetail.getProduct().getId());
        int stock= product.getStock()-invoiceDetail.getQuantity();
        product.setStock(stock);
        productService.save(product);
        invoiceDetailService.save(invoiceDetail);
        return new ResponseEntity<>(invoiceDetail, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<InvoiceDetail> getInvoiceDetail(@PathVariable("id") Long id){
        InvoiceDetail invoiceDetail= invoiceDetailService.findById(id);
        if(invoiceDetail!=null)
            return new ResponseEntity<>(invoiceDetail,HttpStatus.OK);
        return new ResponseEntity<>(invoiceDetail,HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<InvoiceDetail> updateInvoiceDetail(@RequestBody InvoiceDetail invoiceDetail){
        invoiceDetailService.save(invoiceDetail);
        return new ResponseEntity<>(invoiceDetail, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteInvoiceDetail(@PathVariable("id") Long id){
        return new ResponseEntity<>(invoiceDetailService.deleteById(id), HttpStatus.OK);
    }
}

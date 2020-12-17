package com.shopnow.service.UploadFile;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileUploadService {
    public static String uploadFile(MultipartFile file, String src) throws IllegalStateException, IOException {
        File directory = new File(src);
        String name_file=UUID.randomUUID().toString()+"_"+ file.getOriginalFilename();
        file.transferTo(new File(directory.getCanonicalPath()+"/" +name_file ));
        return name_file;
    }
    public static String uploadLogo1(MultipartFile file) throws IllegalStateException, IOException {
        File directory = new File("./src/main/resources/static/fe/ui/assets/images");
        String name_file="logo.svg";
        file.transferTo(new File(directory.getCanonicalPath()+"/" +name_file ));
        return "/fe/ui/assets/images/"+name_file;
    }
    public static String uploadLogo2(MultipartFile file) throws IllegalStateException, IOException {
        File directory = new File("./src/main/resources/static/fe/ui/assets/images");
        String name_file="logo-2.svg";
        file.transferTo(new File(directory.getCanonicalPath()+"/" +name_file ));
        return "/fe/ui/assets/images/"+name_file;
    }

    public static String uploadBackground1(MultipartFile file) throws IllegalStateException, IOException {
        File directory = new File("./src/main/resources/static/fe/ui/assets/images/slider");
        String name_file="1.png";
        file.transferTo(new File(directory.getCanonicalPath()+"/" +name_file ));
        return "/fe/ui/assets/images/slider/"+name_file;
    }

    public static String uploadBackground2(MultipartFile file) throws IllegalStateException, IOException {
        File directory = new File("./src/main/resources/static/fe/ui/assets/images/slider");
        String name_file="2.png";
        file.transferTo(new File(directory.getCanonicalPath()+"/" +name_file ));
        return "/fe/ui/assets/images/slider/"+name_file;
    }

    public static String uploadBackground3(MultipartFile file) throws IllegalStateException, IOException {
        File directory = new File("./src/main/resources/static/fe/ui/assets/images/slider");
        String name_file="3.png";
        file.transferTo(new File(directory.getCanonicalPath()+"/" +name_file ));
        return "/fe/ui/assets/images/slider/"+name_file;
    }
}

// package io.nology.todoproject.config;

// import org.modelmapper.Converter;
// import org.modelmapper.ModelMapper;
// import org.modelmapper.PropertyMap;
// import org.modelmapper.spi.MappingContext;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import io.nology.todoproject.todo.CreateTodoDTO;
// import io.nology.todoproject.todo.Todo;

// @Configuration
// public class ModelMapperConfig {

//     @Bean
//     public ModelMapper modelMapper() {
//         ModelMapper modelMapper = new ModelMapper();
            
//         modelMapper.getConfiguration().setSkipNullEnabled(true);
//         modelMapper.typeMap(String.class, String.class).setConverter(new StringTrimConverter());

//           // Add custom mapping for categories
          
//          Converter<String[], String> categoriesConverter = ctx ->
//             ctx.getSource() == null ? null : String.join(",", ctx.getSource());

//         modelMapper.addMappings(new PropertyMap<CreateTodoDTO, Todo>() {
//             @Override
//             protected void configure() {
//                 using(categoriesConverter).map(source.getCategories()).setCategories(null);
//             }
//         });

//         return modelMapper;
//     }

//     private class StringTrimConverter implements Converter<String, String> {

//         @Override
//         public String convert(MappingContext<String, String> context) {
//             if (context.getSource() == null) {
//                 return null;
//             }
//             return context.getSource().trim();
//         }

//     }

// }

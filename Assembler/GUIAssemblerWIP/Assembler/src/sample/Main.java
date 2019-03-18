package sample;

import javafx.application.Application;
import javafx.scene.control.Button;
import javafx.fxml.FXMLLoader;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;
import javafx.stage.Stage;
import javafx.scene.input.MouseEvent;
import javafx.stage.FileChooser;
import java.io.File;
import java.security.spec.ECField;

import sample.Assembler;

public class Main extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("sample.fxml"));
        primaryStage.setTitle("Hello World");

        //title
        Text title = new Text("Chip 8 Assembler");
        Text team = new Text("by Team FourTheWin");
        title.setStyle("-fx-font: 35 sans-serif;");
        VBox titleBox = new VBox();
        titleBox.getChildren().add(title);
        titleBox.getChildren().add(team);
        titleBox.setAlignment(Pos.CENTER);

        //button
        Button loadFileButton = new Button("Load File");
        loadFileButton.addEventHandler(MouseEvent.MOUSE_CLICKED, event ->{
            FileChooser fileChooser = new FileChooser();
            fileChooser.setTitle("Open Resource File");
            fileChooser.getExtensionFilters().add( new FileChooser.ExtensionFilter("Text Files", "*.txt"));
            File selectedFile = fileChooser.showOpenDialog(primaryStage);
            if (selectedFile != null) {
                Assembler assembler = new Assembler();
                try{
                    assembler.main(selectedFile);
                    //show box success
                }
                catch (Exception e){
                    //show box fail
                }
            }
        }); //click loadFile


        Button writeButton = new Button("Write File");
        // writeButton.addEventHandler(MouseEvent.MOUSE_CLICKED, event ->{}); //change to new scene

        VBox buttonBox = new VBox(10,loadFileButton,writeButton);
        buttonBox.setAlignment(Pos.CENTER);

        //Put both Vboxes together
        VBox mainScreen = new VBox(40,titleBox,buttonBox);
        mainScreen.setAlignment(Pos.CENTER);

        Scene scene = new Scene(mainScreen,720, 480);
        primaryStage.setScene(scene);

        primaryStage.show();

    }


    public static void main(String[] args) {
        launch(args);
    }
}

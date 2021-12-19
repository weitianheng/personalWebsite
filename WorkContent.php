<?php
        $work = $_REQUEST['n'];
        $content = parse_ini_file("listOfWorks.ini",true)[$work];
        $media = $content['media'];
?>
<div style="width:100%; height:100px; background-color:#fff; top:0px;" ></div>
<div >
    <?php 
        
        if($media == 'video'){
            echo '
                <video id="video" width="100%" controls controlsList="nodownload" onloadstart="videoLoad()" >
                    <source src="video/'.$content['name'].'.mp4" type="video/mp4">
                    <source src="video/'.$content['name'].'.ogg" type="video/ogg">
                  Your browser does not support the video tag.
                </video>';
                  
        }else{
            echo '<iframe width="100%" id="iframe_work" data="'.$content['H_min'].'" src="'.$content['url'].'" frameborder="0" onload="load()" ></iframe>';
            
        }
    ?>
</div>
<div id="shuming">

</div>
<div class="container_d" >
    <?php
        $n = 1;
        while ( $content['titel'.$n] ) {
            echo '<div class="detail">';  
            if( strpos($content['img'.$n], ",") ){   
                $urls = explode(",", $content['img'.$n]);
                echo '<div class="detailimage">';
                foreach($urls as $x => $xv){ 
                    echo  '<img style="width: 50%;" src="'.$xv.'">';
                }
                echo '</div>';
            }else{
                echo  '<img class="detailimage" src="'.$content['img'.$n].'">';
            }     
            echo '<div class="detailtitle" style="color:'.$content['color'].'">'.$content['titel'.$n].'</div>
                <div class="detailtext" style="color:'.$content['color'].'">'.$content['inhalt'.$n].'</div>
                  
                </div>';
            $n++;
        } 
    ?>
</div>
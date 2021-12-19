<?php
        $work = $_REQUEST['n'];
        $content = parse_ini_file("listOfWorks.ini",true)[$work];
        $media = $content['media'];
?>
<div  style="position:absolute; top: 50%; padding: 0px 50px 0px 50px; margin-top: -14px; font-style: italic; color:<?php echo $content['color']; ?>">
    <h2 style="display: inline;"><?php echo $content['name']; ?> </h2>
    <p  id="workUnderTitle" data-color="<?php echo $content['color']; ?>" style="display: inline;"><?php echo $content['worktype']; ?></p>
</div>
<?php

$recepient = "mistmee2016@gmail.com";
$sitename = "dev";

$name = trim($_POST["companyName"]);


$message = "Имя: $name;

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

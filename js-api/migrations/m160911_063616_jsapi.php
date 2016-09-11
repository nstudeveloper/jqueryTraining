<?php

use yii\db\Migration;
use yii\db\Schema;

class m160911_063616_jsapi extends Migration
{
    public function safeUp()
    {
        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_general_ci ENGINE=InnoDB';
        }

        $this->createTable('{{%film}}', [
            'id' => Schema::TYPE_PK,
            'title' => Schema::TYPE_STRING . ' NOT NULL',
            'description' => Schema::TYPE_TEXT . ' NOT NULL',
            'like' => Schema::TYPE_BOOLEAN
        ], $tableOptions);
    }

    public function safeDown()
    {
    }
}

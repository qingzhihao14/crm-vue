<template>
  <div class="roleData">
    <el-button type="primary" plain @click="showAddPage">新增角色</el-button>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="roleId" label="编号" width="180"></el-table-column>
      <el-table-column prop="roleName" label="角色名" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <el-table-column prop="roleFlag" :formatter="stateFormat" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 
            编辑按钮
            scope.$index---列的索引
            scope.row---这一行的数据
           -->
          <el-button size="mini" @click="showEditPage(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="flag" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="编号">
          <el-input v-model="form.roleId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色名">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.roleDesc"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form.roleFlag"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
.roleData {
  margin: 2%;
}
.cell {
  text-align: center;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>

import {getInfo, update, deleteById, save} from "@/api/systemset"

export default {
  methods: {
    showAddPage(){
      this.flag = "新增角色";
      this.dialogFormVisible = true;
    },
    handleDelete(index,row){
      deleteById({id:row.roleId})
      .then(resp => {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getAll();
      })
      .catch(err => {
        this.$message({
          message: '删除失败',
          type: 'error'
        });
      })
    },
    stateFormat(row, column){
      if (row.roleFlag === 1){
        return "正常";
      }else {
        return "失效";
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !=0) {
        return "success-row";
      }else{
        return "warning-row";
      }
      return "";
    },
    showEditPage(index,row) {
      this.flag = "编辑角色";
      console.info(index);
      console.info(row)
      this.form.roleId = row.roleId;
      this.form.roleName = row.roleName;
      this.form.roleDesc = row.roleDesc;
      this.form.roleFlag = row.roleFlag;
      this.dialogFormVisible = true;
    },
    edit(){
      if(this.flag === "新增角色"){
        save(this.form).then(resp => {
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.getAll();
          this.form.roleId = this.form.roleName = this.form.roleDesc = this.form.roleFlag="";
        }).catch(err => {
          this.$message({
            message: '新增失败',
            type: 'error'
          });
          this.form.roleId = this.form.roleName = this.form.roleDesc = this.form.roleFlag="";
        })
      }else if(this.flag === "编辑角色"){
        
        update(this.form).then(resp => {
          this.getAll();
          this.dialogFormVisible = false;
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.form.roleId = this.form.roleName = this.form.roleDesc = this.form.roleFlag="";
        }).catch(err => {
          this.$message({
            message: '修改失败',
            type: 'error'
          });
          this.form.roleId = this.form.roleName = this.form.roleDesc = this.form.roleFlag="";     
        })

      }

    },
    getAll(){
      getInfo().then(resp => {
        console.info("success")
        console.info(resp);
        this.tableData = resp;
        console.info(this.tableData);
      }).catch(error => {
        console.info("error")
        console.info(error);
      })
    }
  },
  data() {
    return {
      flag : "",
      form : {
          roleId : "",
          roleName : "",
          roleDesc : "",
          roleFlag : ""
      },
      dialogFormVisible: false,
      tableData: []
    };
  },
  created(){
    //获取数据库里的数据
    //src/api里新建一个systemset.js
    //在<srcipt>标签中导入.js
    //解决1-正常2-失效 定义方法stateFormat 调用方法:formatter="stateFormat"
    //写按钮(.js里写剩余)然后在showEditPage(index,row)
    // getInfo().then(resp => {
    //   console.info("success")
    //   console.info(resp);
    //   this.tableData = resp;
    //   console.info(this.tableData);
    // }).catch(error => {
    //   console.info("error")
    //   console.info(error);
    // })
    this.getAll();
  }
};
</script>
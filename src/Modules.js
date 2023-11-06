export default function Modules(id, name= "", description="",type ="", order="", modules ={}, properties = {}, showInList=false, value=""){
    const module = {
        id:id,
        name: name,
        description: description,
        type: type,
        order: order,
        modules: modules,
        properties: properties,
        showInList: showInList,
        value: value
    };

    /*
    if (level < 1) { // depth of 1 level
        module.modules = Modules(level + 1);
    }
    */
    return module;
}
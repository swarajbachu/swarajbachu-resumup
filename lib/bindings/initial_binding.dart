import 'package:get/get.dart';
import '../controller/resume_temp_controller.dart';

class InitialBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut(() => ResumeTempController());
  }
}
